import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const memberType = defineType({
  name: "member",
  title: "Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "image",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "General Secretary", value: "general_sec" },
          { title: "Club Secretary", value: "club_sec" },
          { title: "Member", value: "member" },
        ],
      },
    }),
    defineField({
      name: "clubs",
      title: "Club Affiliations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "club" }] }],
    }),
    defineField({
      name: "committees",
      title: "Committee Affiliations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "committee" }] }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});