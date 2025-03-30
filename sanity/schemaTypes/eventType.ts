import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event", // Internal name for the schema
  title: "Event", // Display name in Sanity Studio
  type: "document", // Defines it as a document
  icon: CalendarIcon, // Icon to represent events in the studio
  fields: [
    // Event Name
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(), // Validation: Required field
    }),
    // Event Description
    defineField({
      name: "description",
      title: "Event Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(500).warning("Description should be less than 500 characters."),
    }),
    // Event Images
    defineField({
      name: "images",
      title: "Event Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true, // Enables hotspot for better cropping control
          },
        },
      ],
    }),
    // Event Date
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD"
      },
      validation: (Rule) => Rule.required(),
    }),
    // Event Time
    defineField({
      name: "eventTime",
      title: "Event Time",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          { name: "time" } // Human-readable name
        ).error("Time must be in HH:mm format."),
    }),
    // Location
    defineField({
      name: "location",
      title: "Event Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // Organizer
    defineField({
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),
    // Registration Link
    defineField({
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "eventDate",
      media: "images", // First image as the preview image
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0]
      return {
        title:title,
        subtitle: `Date: ${subtitle}`, // Adding a prefix to the event date
        media:image,
      };
    },
  },
});
