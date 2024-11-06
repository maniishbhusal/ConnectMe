import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProfileEditForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input placeholder="Enter name" className="w-full mt-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Username</label>
        <Input placeholder="Enter username" className="w-full mt-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea placeholder="Enter description" className="w-full mt-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Location</label>
        <Input placeholder="Enter location" className="w-full mt-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Link</label>
        <Input placeholder="Enter link" className="w-full mt-2" />
      </div>
      <Button type="submit" className="w-full mt-4">
        Save Changes
      </Button>
    </form>
  );
}
