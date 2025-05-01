type MetricType = "TTFB" | "FCP" | "LCP" | "FID" | "CLS" | "Custom";

interface PerformanceMetric {
  name: string;
  value: number;
  type: MetricType;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initObservers();
    this.captureNavigationTiming();
  }

  private initObservers() {
    // First Contentful Paint (FCP)
    if (PerformanceObserver.supportedEntryTypes.includes("paint")) {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            this.addMetric("First Contentful Paint", entry.startTime, "FCP");
          }
        });
      });
      this.observer.observe({ entryTypes: ["paint"] });
    }

    // Largest Contentful Paint (LCP)
    if (
      PerformanceObserver.supportedEntryTypes.includes(
        "largest-contentful-paint"
      )
    ) {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.addMetric("Largest Contentful Paint", lastEntry.startTime, "LCP");
      });
      this.observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }

    // First Input Delay (FID)
    if (PerformanceObserver.supportedEntryTypes.includes("first-input")) {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "first-input") {
            const fidEntry = entry as PerformanceEventTiming;
            const delay = fidEntry.processingStart - fidEntry.startTime;
            this.addMetric("First Input Delay", delay, "FID");
          }
        });
      });
      this.observer.observe({ entryTypes: ["first-input"] });
    }

    // Cumulative Layout Shift (CLS)
    if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
      let clsValue = 0;
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.addMetric("Cumulative Layout Shift", clsValue, "CLS");
          }
        });
      });
      this.observer.observe({ entryTypes: ["layout-shift"] });
    }
  }

  private captureNavigationTiming() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.addMetric(
            "Time to First Byte",
            navigation.responseStart - navigation.requestStart,
            "TTFB"
          );
        }
      }, 0);
    });
  }

  public addMetric(name: string, value: number, type: MetricType) {
    const metric: PerformanceMetric = {
      name,
      value,
      type,
      timestamp: Date.now(),
    };
    this.metrics.push(metric);
    this.reportMetric(metric);
  }

  private reportMetric(metric: PerformanceMetric) {
    // 这里可以添加上报逻辑，例如发送到分析服务器
    console.log("Performance Metric:", metric);
  }

  public getMetrics() {
    return this.metrics;
  }

  public customMeasure(name: string, startMark: string, endMark: string) {
    performance.measure(name, startMark, endMark);
    const measures = performance.getEntriesByName(name, "measure");
    if (measures.length > 0) {
      this.addMetric(name, measures[0].duration, "Custom");
    }
  }

  public startMark(name: string) {
    performance.mark(`${name}-start`);
  }

  public endMark(name: string) {
    performance.mark(`${name}-end`);
    this.customMeasure(name, `${name}-start`, `${name}-end`);
  }
}

export const performanceMonitor = new PerformanceMonitor();
