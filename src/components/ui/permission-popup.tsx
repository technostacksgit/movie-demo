import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Button } from "./button";

type PermissionPopupProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleConfirmDelete: () => void;
};

const PermissionPopup: React.FC<PermissionPopupProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  handleConfirmDelete,
}) => {
  return (
    // <div className="absolute w-1/2 top-1/2 bg-input text-primary-foreground rounded-xl">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-6 rounded-md shadow-lg">
          {/* <DialogTitle>Ready to say goodbye?</DialogTitle> */}
          <DialogDescription>
            Deleting this movie will remove it from your collection forever. Are
            you sure you want to cut it from the cast?
          </DialogDescription>

          {/* Action buttons */}
          <div className="w-full flex justify-end items-center space-x-4 mt-4">
            <DialogClose asChild>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" size="sm" onClick={handleConfirmDelete}>
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    // </div>
  );
};

export default PermissionPopup;
