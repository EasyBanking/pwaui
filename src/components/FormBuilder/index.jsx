import { Text, Input, Textarea, Grid } from "@nextui-org/react";

/**
    inputs types :
    - text
    - textarea
    - select
    - checkbox
    - date

    inputs props :
    - label
    - name
    - value
    - options
    - onChange
    - error
    

    form props :
    - inputs
    - onSubmit
    - error
    - loading
    - success
    - onReset
    - validation schema

 */

/* 
    fields per page number:
    title
*/

const normal = ["text", "date", "number", "email"];

const FormBuilder = (props) => {
  const { schema, fields, onSubmit, validationSchema, title } = props;

  return (
    <section className="mt-4">
      <Text h4>{title}</Text>
      <div>
        <form className="width-full">
          {fields.map((f, i) => {
            if (normal.includes(f.type)) {
              return (
                <Grid sm={3}>
                  <Input
                    fullWidth
                    label={f.name}
                    key={`inpt-${i}`}
                    type={f.type}
                    size="lg"
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                </Grid>
              );
            } else if (f.type === "textarea") {
              return (
                <Grid sm={3}>
                  <Textarea
                    key={`inpt-${i}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                </Grid>
              );
            }
          })}
        </form>
      </div>
    </section>
  );
};

export default FormBuilder;
