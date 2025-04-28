const Metrics = () => (
  <div
    aria-label="metrics-container"
    className="flex flex-col rounded-lg border border-blue-200 bg-blue-400 hover:border-blue-300 active:border-neutral-200"
  >
    <div className="flex grow items-center justify-between p-5">
      <dl>
        <dt className="text-2xl font-bold">Article stats number 1</dt>
        <dd className="text-sm font-medium text-neutral-500">
          Articles stats here
        </dd>
      </dl>
    </div>
  </div>
);

export default Metrics;
