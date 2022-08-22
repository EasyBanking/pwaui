import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Text,
  Input,
  Textarea,
  Grid,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { FallBack } from "../Loader/index";

const normal = ["text", "date", "number", "email", "password"];

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

  const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log(values);

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
          <Grid.Container>
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
                        value={values[f.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors[f.name]}
                        helperColor="error"
                      />
                    </div>
                  </Grid>
                );
              } else if (f.type === "checkbox") {
                return (
                  <Grid sm={3}>
                    <div className="mb-8 flex flex-col items-center justify-end">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text mr-5">{f.name}</span>
                          <input
                            type="checkbox"
                            name={f.name}
                            checked={values[f.name]}
                            onChange={handleChange}
                            value={values[f.name]}
                            className="checkbox checkbox-primary"
                          />
                        </label>
                      </div>
                      <label className="text-error">{errors[f.name]}</label>
                    </div>
                  </Grid>
                );
              } else if (f.type === "select") {
                return (
                  <Grid sm={3}>
                    <div className="mb-8 flex flex-col">
                      <label>{f?.name}</label>
                      <select
                        key={`inpt-${i}`}
                        name={f?.name}
                        value={values[f.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select select-bordered w-full"
                      >
                        {f.options.map((o, i) => {
                          return (
                            <option value={o} key={`i-o-${i}`}>
                              {o}
                            </option>
                          );
                        })}
                      </select>
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
                        value={values[f.name]}
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
          </Grid.Container>

          <Button type="submit">submit</Button>
        </form>
      </div>
    </section>
  );
};

export default FormBuilder;
