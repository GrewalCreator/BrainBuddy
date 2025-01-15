import * as Toast from "@radix-ui/react-toast";
import "../assets/css/Toast.css";

export const ToastDemo = ({ open, setOpen, title, description }) => {
  return (
    <Toast.Provider>
      <Toast.Root
        className="toast-root"
        open={open}
        onOpenChange={setOpen}
        duration={2000}
      >
        <Toast.Title className="toast-title">{title}</Toast.Title>
        <Toast.Description className="toast-description">
          {description}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
};
