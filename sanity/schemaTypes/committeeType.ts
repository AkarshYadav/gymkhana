import { defineField, defineType } from "sanity";

export const committeeType = defineType({
  name: "committee",
  title: "Committee",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Committee Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "image",
      title: "Committee Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "generalSecretary",
      title: "General Secretary",
      type: "reference",
      to: [{ type: "member" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});