import toast from "react-hot-toast";

const useConfirmToast = () => {
  const confirm = ({ message, onConfirm, onCancel }) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span>{message || "Are you sure?"}</span>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingId = toast.loading("Processing...");

              try {
                await onConfirm();
                toast.success("Success", { id: loadingId });
              } catch (err) {
                toast.error(err.message || "Failed", { id: loadingId });
              }
            }}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              onCancel && onCancel();
            }}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  return { confirm };
};

export default useConfirmToast;