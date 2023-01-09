import './Form.css';

const Form = ({ submit, changeHandler, firstname, lastname, phonenumber, messsage, role }) => {
    return (
        <form className='form' onSubmit={submit}>
            <div className='form-group'>
                <label htmlFor="firstName" name="firstname">First name</label>
                <input type="text" name='firstname' value={firstname} onChange={changeHandler} />
            </div>
            <div className='form-group'>
                <label htmlFor="lastname">Last name</label>
                <input type="text" name='lastname' value={lastname} onChange={changeHandler} />
            </div>
            <div className='form-group'>
                <label htmlFor="phonenumber">Phone number</label>
                <input type="text" name='phonenumber' value={phonenumber} onChange={changeHandler} />
            </div>
            <div className='form-group'>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" cols="15" rows="3" value={messsage} onChange={changeHandler} ></textarea>
            </div>
            <div className='form-group'>
                <label htmlFor="role">Role</label>
                <select name="role" id="role" value={role} onChange={changeHandler} >
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Employee">Employee</option>
                </select>
            </div>
            <button className='submit'>Send</button>
        </form>
    )
}

export default Form;