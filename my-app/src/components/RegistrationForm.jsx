import React from 'react';


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            agreeToTerms: false,
            skills: {
                html: false,
                css: false,
                javascript: false,
                react: false,
            },
            education: '本科',
            bio: '',
        }
        this.avatarRef = React.createRef();
    }
    render() {
        const { username, password, agreeToTerms } = this.state;
        const isSubmitDisabled = !username || !password || !agreeToTerms;
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>用户注册</h2>
                <div>
                    <label>用户名</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div>
                    <label>密码</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div>
                    <label>技术栈</label>
                    {Object.keys(this.state.skills).map(skill => (
                        <div key={skill}>
                            <label>{skill}</label>
                            <input type="checkbox" name={skill} checked={this.state.skills[skill]} onChange={this.handleSkillsChange} />
                        </div>
                    ))}
                </div>
                <div>
                    <label>教育背景</label>
                    <select name="education" value={this.state.education} onChange={this.handleChange}>
                        <option value="本科">本科</option>
                        <option value="专科">专科</option>
                        <option value="硕士">硕士</option>
                        <option value="博士">博士</option>
                    </select>
                </div>
                <div>
                    <label>个人简介</label>
                    <textarea name="bio" value={this.state.bio} onChange={this.handleChange} />
                </div>
                <div>
                    <label>
                        同意用户协议
                    </label>
                    <input type="checkbox" name="agreeToTerms" checked={this.state.agreeToTerms} onChange={this.handleChange} />
                </div>
                <div>
                    <label>头像</label>
                    <input type="file" ref={this.avatarRef} />
                </div>
                <button type="submit" disabled={isSubmitDisabled}>
                    注册
                </button>
            </form>
        )
    }
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSkillsChange = (e) => {
        const  { name, checked } = e.target;
        // this.setState(preState => ({
        //     skills: {
        //         ...preState.skills,
        //         [name]: checked
        //     }
        // }))
        this.setState({
            skills: {
                ...this.state.skills,
                [name]: checked
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...this.state,
            avatar: this.avatarRef.current.files[0] || null
        }
        console.log(finalData);
    }
}

export default RegistrationForm;