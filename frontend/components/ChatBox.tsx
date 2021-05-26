import { Formik } from "formik";

export default function ChatBox({ gateway, ids }) {

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        if (values.name.length === 0) return;
        actions.resetForm({});

        const message = {
          content: values.name.replace("{shrug}", "¯\\_(ツ)_/¯"),
          channel: {
            id: ids.id,
          },
        };

        gateway.send(5, { message }, '')
      }}
    >
      {(props) => (
        <>
          <form
            onSubmit={props.handleSubmit}
            className="chatbox"
            autoComplete="off"
          >
            <input
              type="text"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.name}
              placeholder="Type a message "
              id="chatbox_input"
              name="name"
            />
          </form>

          {/* <Picker onSelect={(d) => {props.values.name += d.native}} /> */}
        </>
      )}
    </Formik>
  );
}