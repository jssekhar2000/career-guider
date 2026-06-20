interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="animate-fade-in rounded-xl border border-rose-500/30 bg-rose-500/10 p-5">
      <p className="font-medium text-rose-200">Something went wrong</p>
      <p className="mt-1 text-sm text-rose-300/90">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}
