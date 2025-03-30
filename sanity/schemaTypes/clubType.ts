import { defineField, defineType } from "sanity";

export const clubType = defineType({
  name: "club",
  title: "Club",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Club Name",
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
      title: "Club Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "committee",
      title: "Committee",
      type: "reference",
      to: [{ type: "committee" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secretary",
      title: "Club Secretary",
      type: "reference",
      to: [{ type: "member" }],
    }),
    defineField({
      name: "members",
      title: "Club Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
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