import React from 'react';



const skillOptions = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
const educationOptions = ['高中', '大专', '本科', '研究生'];


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userForm: {
                name: '',
                password: '',
                skill: '', // 如果选中HTML CSS则值为"HTML,CSS"
                education: '',
                avatar: '',
            },
            isAgree: false, // 是否同意协议
        }
        // 定义头像的ref
        this.avatarRef = React.createRef();
    }
    onChange = (e) => {
        const { name, value, type } = e.target;
        // 如果name为skill，则需要处理多选框的情况
        if (name === 'skill') {
            // value(外界的) userForm.skill(本地的)
            const skills = this.state.userForm.skill.split(',').filter(item => item); // 过滤掉空字符串
            // 判断当前有没有这个技能，有的话就移除，没有的话就加入
            if(skills.includes(value)) {
                const newSkills = skills.filter((item) => item !== value);
                this.setState((prevState) => ({
                    userForm: {
                        ...prevState.userForm,
                        skill: newSkills.join(',')
                    }
                }), () => {
                    console.log(this.state.userForm);
                });

            } else {
                const newSkills = [...skills, value];
                this.setState((prevState) => ({
                    userForm: {
                        ...prevState.userForm,
                        skill: newSkills.join(',')
                    }
                }), () => {
                    console.log(this.state.userForm);
                })
            }
            return;
        }

        // 如果是头像上传
        if(type === 'file') {
            const file = e.target.files[0];
            this.setState((prevState) => ({
                userForm: {
                    ...prevState.userForm,
                    avatar: file
                }
            }), () => {
                console.log(this.state.userForm);
            });
            return;
        }

        // 如果name为isAgree
        if(name === 'isAgree') {
            this.setState({
                isAgree: e.target.checked
            }, () => {
                console.log(this.state.isAgree);
            });
            return;
        }

        this.setState(prevState => ({
            userForm: {
                ...prevState.userForm,
                [name]: value
            }
        }), () => {
            console.log(this.state.userForm);
        });
    }

    onSubmit = (e) => {
        e.preventDefault(); // 阻止默认提交行为
        if (!this.state.isAgree) {
            alert('请同意协议后再提交');
            return;
        }


        console.log('提交表单', this.state.userForm);
    }
    render() {
        return <>
        <form>
            <div className='formItem'>
                <label>用户名</label>
                <input type="text" value={this.state.userForm.name} onChange={this.onChange} name="name" placeholder='请输入用户名'/>
            </div>
            <div className="formItem">
                <label>密码</label>
                <input type="password" value={this.state.userForm.password} onChange={this.onChange} name="password" placeholder='请输入密码'/>
            </div>
            <div className="formItem">
                <label>技能</label>
                {
                    skillOptions.map(option => (
                    <label key={option}>
                        <input type="checkbox" name="skill" value={option} checked={this.state.userForm.skill.includes(option)} onChange={this.onChange} />
                        {option}
                    </label>
                    ))
                }
            </div>
            <div className="formItem">
                <label>教育背景</label>
                <select name="education" value={this.state.userForm.education} onChange={this.onChange}>
                    <option value="">请选择</option>
                    {
                        educationOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>
            <div className="formItem">
                <label>个人简介</label>
                <textarea name="bio" value={this.state.userForm.bio} onChange={this.onChange} placeholder='请输入个人简介'></textarea>
            </div>
           <div className="formItem">
                <label>头像</label>
                <input type="file" ref={this.avatarRef} onChange={this.onChange}/>
           </div>
           <div className="formItem">
               <label>是否同意协议</label>
               <input type="checkbox" checked={this.state.isAgree} onChange={this.onChange} name="isAgree"/>
           </div>
           <div className="formItem">
            <button type="submit" onClick={this.onSubmit}>提交</button>
           </div>
        </form>
        </>
    }
   
}

export default RegistrationForm;