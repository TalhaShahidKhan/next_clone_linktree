"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect } from "next/navigation";

const formSchema = z.object({
  handle: z.string().min(2).max(50),
  description: z.string().min(10).max(500),
  imageUrl: z.string().url(),
  links: z.array(
    z.object({
      title: z.string().min(1),
      url: z.string().url(),
    })
  ),
});

export default function CreateLinktree() {
  const [links, setLinks] = useState([{ title: "", url: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: "",
      description: "",
      imageUrl: "",
      links: [{ title: "", url: "" }],
    },
  });

  const addLink = async () => {
    setLinks(prevLinks => [...prevLinks, { title: "", url: "" }]);
  };

  const clearForm = async () => {
    await form.reset({
      handle: "",
      description: "",
      imageUrl: "",
      links: [{ title: "", url: "" }],
    });
    setLinks([{ title: "", url: "" }]);
  };

  const removeLink = async (index: number) => {
    setLinks(prevLinks => prevLinks.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/setlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(`Error: ${data.message}`);
        return;
      }

      await clearForm();
      console.log(data.handle)
      redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/${data.handle}`);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-2xl flex items-center justify-center h-screen"
    >
      <Card className="p-6 shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Setlink</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="your-handle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-image-url.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio/Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Links</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLink}
                  disabled={isSubmitting}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <FormField
                      control={form.control}
                      name={`links.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Link Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeLink(index)}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Setlink'}
            </Button>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
