'use client';
import { useRef, useState, useEffect } from "react";

// Replace this with your local mp3 file in the public directory or import
const SONG_SRC = "/lofi.mp3"; // Place your mp3 in public/ as lofi.mp3

const getBarCount = () => (typeof window !== "undefined" && window.innerWidth < 600 ? 10 : 15);

const Song: React.FC = () => {
    const [BAR_COUNT, setBarCount] = useState(getBarCount());

    useEffect(() => {
        const handleResize = () => {
            setBarCount(getBarCount());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const TOTAL_BARS = BAR_COUNT * 2;
    const BAR_WIDTH = 4;
    const BAR_GAP = 2;
    const BAR_MAX_HEIGHT = 48;
    const BAR_MIN_HEIGHT = 8;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [barHeights, setBarHeights] = useState<number[]>(
        Array(TOTAL_BARS).fill(BAR_MIN_HEIGHT)
    );
    // Use a ref to store the animation frame id
    const animationRef = useRef<number | null>(null);

    // Smoothly animate bar heights for a more fluid look
    const prevHeightsRef = useRef<number[]>(Array(TOTAL_BARS).fill(BAR_MIN_HEIGHT));
    const SMOOTHING = 0.5; // 0 = instant, 1 = no movement

    // Helper to smooth the transition between bar heights
    const smoothHeights = (prev: number[], next: number[]) =>
        prev.map((h, i) => h + (next[i] - h) * (1 - SMOOTHING));
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    // Responsive bar sizing
    const [barDimensions, setBarDimensions] = useState({
        width: BAR_WIDTH,
        gap: BAR_GAP,
        maxHeight: BAR_MAX_HEIGHT,
        minHeight: BAR_MIN_HEIGHT,
    });

    useEffect(() => {
        const handleResize = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            // Adjust bar width and height based on viewport width
            let width = 4, gap = 2, maxHeight = 48, minHeight = 8;
            if (vw < 600) {
                width = 2;
                gap = 1;
                setBarHeights(Array(BAR_COUNT).fill(BAR_MIN_HEIGHT)); // Reduce bars for small screens
                maxHeight = 28;
                // Optionally, reduce bar count for small screens by adjusting BAR_COUNT logic
                minHeight = 5;
            } else if (vw < 700) {
                width = 3;
                gap = 1.5;
                maxHeight = 36;
                minHeight = 7;
            }
            setBarDimensions({ width, gap, maxHeight, minHeight });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        // Initialize AudioContext and MediaElementSource only once
        if (!audioContextRef.current && audioRef.current) {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = ctx;
        }
        if (audioContextRef.current && audioRef.current && !sourceNodeRef.current) {
            sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
            const analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 64;
            sourceNodeRef.current.connect(analyser);
            analyser.connect(audioContextRef.current.destination);
            analyserRef.current = analyser;
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        }
        if (!playing) {
            cancelAnimationFrame(animationRef.current!);
            setBarHeights(Array(TOTAL_BARS).fill(BAR_MIN_HEIGHT));
            return;
        }

        const animate = () => {
            if (!analyserRef.current || !dataArrayRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);

            // Map frequency data to bars by averaging the values in each range
            const step = dataArrayRef.current.length / TOTAL_BARS;
            const heights = Array.from({ length: TOTAL_BARS }, (_, i) => {
                const start = Math.floor(i * step);
                const end = Math.floor((i + 1) * step);
                let sum = 0;
                let count = 0;
                for (let j = start; j < end; j++) {
                    sum += dataArrayRef.current![j] || 0;
                    count++;
                }
                const avg = count > 0 ? sum / count : 0;
                // Ensure every bar moves by adding a small minimum fluctuation
                const normalized = (avg / 255) * (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT) + BAR_MIN_HEIGHT;
                // Add a tiny random jitter to avoid static bars
                const jitter = Math.random() * 2 + 1;
                return Math.max(
                    BAR_MIN_HEIGHT,
                    Math.min(BAR_MAX_HEIGHT, normalized + jitter)
                );
            });

            // Smooth the bar heights for fluid animation
            const smoothed = smoothHeights(prevHeightsRef.current, heights);
            prevHeightsRef.current = smoothed;
            setBarHeights(smoothed);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current!);
            // Do not close the AudioContext here, as it should persist for the component's lifetime
        };
    }, [playing]);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => {
            cancelAnimationFrame(animationRef.current!);
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    const handlePlay = async () => {
        if (!playing) {
            // Resume AudioContext if it's suspended (required by browsers)
            if (audioContextRef.current && audioContextRef.current.state === "suspended") {
                await audioContextRef.current.resume();
            }
            await audioRef.current?.play();
            setPlaying(true);
        }
    };

    const handlePause = () => {
        audioRef.current?.pause();
        setPlaying(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <audio
                ref={audioRef}
                src={SONG_SRC}
                onEnded={handlePause}
                preload="auto"
                style={{ display: "none" }}
            />
            <button
                onClick={playing ? handlePause : handlePlay}
                style={{
                    marginBottom: 24,
                    border: "none",
                    background: "none",
                    color: "#c084fc",
                    borderRadius: 8,
                    padding: "12px 24px",
                    fontSize: 22,
                    cursor: "pointer",
                }}
                aria-label={playing ? "PAUSE" : "PLAY"}
            >
                {playing ? "PAUSE" : "PLAY"}
            </button>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "end",
                                height: BAR_MAX_HEIGHT,
                                background: "none",
                                padding: 12,
                                borderRadius: 12,
                            }}
                        >
                            {Array.from({ length: TOTAL_BARS }).map((_, i) => {
                                // If not playing, show all bars at center height
                                let height: number;
                                if (!playing) {
                                    height = (BAR_MAX_HEIGHT + BAR_MIN_HEIGHT) / 2;
                                } else {
                                    // Sine wave animation
                                    const now = Date.now() / 1000;
                                    const frequency = 1.2; // wave speed
                                    const waveLength = 2.5 * Math.PI; // how many waves fit
                                    const phase = (i / TOTAL_BARS) * waveLength + now * frequency;
                                    const amplitude = (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT) / 2;
                                    const center = (BAR_MAX_HEIGHT + BAR_MIN_HEIGHT) / 2;
                                    height = center + Math.sin(phase) * amplitude;
                                }

                                // Gradient color
                                const t = i / (TOTAL_BARS - 1);
                                const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
                                const from = { r: 59, g: 130, b: 246 };
                                const to = { r: 162, g: 28, b: 175 };
                                const r = lerp(from.r, to.r);
                                const g = lerp(from.g, to.g);
                                const b = lerp(from.b, to.b);
                                const barColor = `rgb(${r},${g},${b})`;

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            width: BAR_WIDTH,
                                            height,
                                            marginLeft: i === 0 ? 0 : BAR_GAP,
                                            background: barColor,
                                            borderRadius: 2,
                                            transition: "height 0.1s linear",
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            };
            
            export default Song;
