import { Formik } from "formik"

export function CreateServer({ user }) {

    return (
            <div id="community-create">
                <div className="communiy-create-inner">
                    <h2> Create Server </h2>
                    <Formik
                    onSubmit={console.log}
                    initialValues={{}}
                    >
                        {
                            props => (
                                <form onSubmit={props.handleSubmit}>
                                    <input 
                                    className="community-create-in"
                                    placeholder={`${user.username}'s community`}
                                    name="communityName"
                                    />
                                </form>
                            )
                        }
                    </Formik>
                </div>
            </div>
    )
}