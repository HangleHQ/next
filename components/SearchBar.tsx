import { Formik } from 'formik'

export default function Searchbar({ guild, channel }) {


    return (
        <span>
            <Formik
                initialValues={{}}
                onSubmit={console.log}
            >
                {
                    props => (
                        <form onSubmit={props.handleSubmit}>
                            <input
                            name="search"
                            onChange={props.handleChange}
                            />
                        </form>
                    )
                }
            </Formik>
        </span>
    );
}