import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto  bg-white rounded-lg shadow-md my-10">
      <h1 className="text-center text-3xl my-3 font-semibold text-slate-700">
        Create a post
      </h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Select>
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="COVID-19">COVID-19</SelectItem>
                <SelectItem value="Consumer">Consumer</SelectItem>
                <SelectItem value="Tech News">Tech News</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between  p-3">
          <Input type="file" accept="image/*" />

          <Button className="bg-slate-700">Upload Image</Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72  mb-12 "
          required
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md "
        >
          Publish Your Article
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
