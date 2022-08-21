import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Input, Textarea, Grid, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { FallBack } from "../Loader/index";

const normal = ["text", "date", "number", "email"];

const FormBuilder = (props) => {
  const {
    fields,
    onSubmit,
    validationSchema,
    title,
    initialValues,
    alert,
    setAlert,
    loading,
  } = props;

  const { handleSubmit, handleBlur, handleChange, values, errors, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <section className="mt-4 min-h-screen">
      {loading ? <FallBack /> : null}
      {alert?.show ? (
        <div className="toast toast-end">
          <div className={`alert ${alert.type}`}>
            <div>
              <span>{alert?.message}</span>
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => {
                  setAlert({
                    message: "",
                    type: "",
                    show: false,
                  });
                }}
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Text h4>{title}</Text>
      <div>
        <form className="width-full" onSubmit={handleSubmit}>
          {fields.map((f, i) => {
            if (normal.includes(f.type)) {
              return (
                <Grid sm={3}>
                  <div className="mb-8">
                    <Input
                      fullWidth
                      label={f.name}
                      key={`inpt-${i}`}
                      type={f.type}
                      size="lg"
                      name={f.name}
                      placeholder={f.placeholder}
                      values={values[f.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors[f.name]}
                      helperColor="error"
                    />
                  </div>
                </Grid>
              );
            } else if (f.type === "textarea") {
              return (
                <Grid sm={3}>
                  <div className="mb-8">
                    <Textarea
                      key={`inpt-${i}`}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      values={values[f.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors[f.name]}
                      helperColor="error"
                    />
                  </div>
                </Grid>
              );
            }
          })}

          <Button type="submit">submit</Button>
        </form>
      </div>
    </section>
  );
};

export default FormBuilder;
