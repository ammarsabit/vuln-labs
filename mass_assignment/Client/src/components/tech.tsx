export function Tech() {
  return (
    <section id="technology" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-primary">
            Technology
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            The Middle-Out Algorithm
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            A deep dive into the compression engine that is changing everything.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-chart-4/60" />
              <span className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">
                middle_out.pp
              </span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-muted-foreground">
              <code>{`// PiedPiper Middle-Out Compression Engine
// Weissman Score: 5.2 (verified)

fn compress(data: Stream) -> CompressedStream {
  let midpoint = data.len() / 2;
  let (left, right) = data.split_at(midpoint);

  // Bidirectional entropy analysis
  let left_tree  = build_huffman(left, .adaptive);
  let right_tree = build_huffman(right, .adaptive);

  // Merge trees from the middle out
  let merged = merge_optimal(left_tree, right_tree);

  // Apply lossless neural quantization
  let optimized = neural_quantize(merged, {
    precision: .max,
    loss: .zero,
  });

  return optimized.to_stream();
}`}</code>
            </pre>
          </div>

          <div className="flex flex-col gap-8">
            {[
              {
                step: "01",
                title: "Bidirectional Entropy Scanning",
                description:
                  "Traditional algorithms compress linearly, start to end. PiedPiper identifies the statistical midpoint of any data stream and scans outward in both directions simultaneously, capturing entropy patterns that unidirectional methods miss entirely.",
              },
              {
                step: "02",
                title: "Adaptive Huffman Tree Merging",
                description:
                  "Two independent Huffman trees are constructed from each half of the data. Our patented merge algorithm finds the optimal combined encoding that minimizes total bit length, a problem solved in O(n log n) time through a novel graph reduction technique.",
              },
              {
                step: "03",
                title: "Neural Quantization Layer",
                description:
                  "The final stage applies a lightweight neural network that has been trained on petabytes of real-world data patterns. It identifies micro-redundancies invisible to traditional methods, squeezing out the last bits of inefficiency without any data loss.",
              },
              {
                step: "04",
                title: "Distributed Assembly",
                description:
                  "Compressed chunks are distributed across our decentralized node network. Reconstruction happens in parallel across multiple nodes, achieving decompression speeds that scale linearly with network size.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
