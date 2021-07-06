const Person = {
  schema: {
    type: "object",
    properties: {
      people: {
        type: "array",
        title: "People",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "Please enter your name",
            },
            vegetarian: {
              type: "boolean",
            },
            birthDate: {
              type: "string",
              format: "date",
            },
            nationality: {
              type: "string",
              oneOf: [
                {
                  const: "DE",
                  title: "German",
                },
                {
                  const: "IT",
                  title: "Italian",
                },
                {
                  const: "JP",
                  title: "Japanese",
                },
                {
                  const: "US",
                  title: "North-American",
                },
                {
                  const: "RU",
                  title: "Russian",
                },
              ],
            },
            personalData: {
              type: "object",
              properties: {
                age: {
                  type: "integer",
                  description: "Please enter your age.",
                },
                height: {
                  type: "number",
                },
                drivingSkill: {
                  type: "number",
                  maximum: 10,
                  minimum: 1,
                  default: 7,
                },
              },
              required: ["age", "height"],
            },
            occupation: {
              type: "string",
            },
            postalCode: {
              type: "string",
              maxLength: 5,
            },
            items: {
              type: "array",
              title: "items",
              uniqueItems: true,
              errorMessage: {
                uniqueItems: "Items must be unique",
              },
              maxItems: 3,
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    enum: ["Type 1", "Type 2", "Type 3"],
                  },
                  price: {
                    type: "number",
                    maximum: 10,
                    minimum: 1,
                    default: 1,
                  },
                },
              },
            },
          },
          required: ["occupation", "nationality"],
        },
      },
    },
  },
  uischema: {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/people",
        options: {
          detail: {
            type: "VerticalLayout",
            elements: [
              {
                type: "Label",
                text: "Person Info",
              },
              {
                type: "HorizontalLayout",
                elements: [
                  {
                    type: "Control",
                    scope: "#/properties/name",
                  },
                  {
                    type: "Control",
                    scope: "#/properties/personalData/properties/age",
                  },
                  {
                    type: "Control",
                    scope: "#/properties/birthDate",
                  },
                ],
              },
              {
                type: "Label",
                text: "Additional Information",
              },
              {
                type: "HorizontalLayout",
                elements: [
                  {
                    type: "Control",
                    scope: "#/properties/personalData/properties/height",
                  },
                  {
                    type: "Control",
                    scope: "#/properties/nationality",
                  },
                  {
                    type: "Control",
                    scope: "#/properties/occupation",
                    suggestion: [
                      "Accountant",
                      "Engineer",
                      "Freelancer",
                      "Journalism",
                      "Physician",
                      "Student",
                      "Teacher",
                      "Other",
                    ],
                  },
                ],
              },
              {
                type: "Label",
                text: "Items",
              },
              {
                type: "Control",
                scope: "#/properties/items",
                options: {
                  detail: {
                    type: "VerticalLayout",
                    elements: [
                      {
                        type: "Label",
                        text: "Item Info",
                      },
                      {
                        type: "Control",
                        scope: "#/properties/price",
                      },
                      {
                        type: "Control",
                        scope: "#/properties/name",
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
  data: {
    people: [
      {
        name: "Dummy Name",
        vegetarian: false,
        birthDate: "1987-01-10",
        personalData: {
          age: 28,
        },
        postalCode: "87100",
        items: [
          {
            price: 1,
            name: "Item 1",
          },
        ],
      },
    ],
  },
};

export default Person;
