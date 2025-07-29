import React from "react";
// function MyForm() {
//   const handleSubmit = (e) => {
//     // 打印e
//     console.log(e);
//     e.preventDefault();
//     //处理表单提交
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Enter something..." />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }


// 定义为类的形式
class MyForm extends React.Component {
    handleSubmit(e, value) {
        e.preventDefault();
        // 打印this
        console.log(this);
        // 打印传入的值
        console.log(value);
    };
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e, '123')}>
                <input type="text" placeholder="Enter something..." />
                <button type="submit">Submit</button>
            </form>
        );
    }
}




export default MyForm;