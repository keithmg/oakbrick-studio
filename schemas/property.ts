import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyRent',
      title: 'Monthly Rent',
      type: 'number',
      description: 'Monthly rental price in dollars',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'House', value: 'house'},
          {title: 'Condo', value: 'condo'},
          {title: 'Townhouse', value: 'townhouse'},
          {title: 'Land', value: 'land'},
          {title: 'Commercial', value: 'commercial'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Pending', value: 'pending'},
          {title: 'Rented', value: 'rented'},
        ],
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      description: 'Display this property on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'squareFeet',
      title: 'Square Feet',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'lat', type: 'number', title: 'Latitude'},
        {name: 'lng', type: 'number', title: 'Longitude'},
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Year Built',
      type: 'number',
      validation: (Rule) => Rule.min(1800).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'lotSize',
      title: 'Lot Size (acres)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'securityDeposit',
      title: 'Security Deposit',
      type: 'number',
      description: 'Security deposit amount in dollars',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'leaseTerm',
      title: 'Lease Term',
      type: 'string',
      options: {
        list: [
          {title: 'Month-to-Month', value: 'month-to-month'},
          {title: '6 Months', value: '6-months'},
          {title: '1 Year', value: '1-year'},
          {title: '2 Years', value: '2-years'},
        ],
      },
    }),
    defineField({
      name: 'petPolicy',
      title: 'Pet Policy',
      type: 'string',
      options: {
        list: [
          {title: 'Pets Allowed', value: 'allowed'},
          {title: 'No Pets', value: 'not-allowed'},
          {title: 'Case by Case', value: 'case-by-case'},
          {title: 'Cats Only', value: 'cats-only'},
          {title: 'Small Dogs Only', value: 'small-dogs'},
        ],
      },
    }),
    defineField({
      name: 'utilitiesIncluded',
      title: 'Utilities Included',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Water', value: 'water'},
          {title: 'Electricity', value: 'electricity'},
          {title: 'Gas', value: 'gas'},
          {title: 'Internet', value: 'internet'},
          {title: 'Trash', value: 'trash'},
          {title: 'None', value: 'none'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      monthlyRent: 'monthlyRent',
      media: 'images.0',
      status: 'status',
    },
    prepare(selection) {
      const {title, monthlyRent, status, media} = selection
      return {
        title: title,
        subtitle: `$${monthlyRent?.toLocaleString()}/month - ${status}`,
        media: media,
      }
    },
  },
})
