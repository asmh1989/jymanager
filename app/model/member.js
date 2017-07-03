'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const AppSchema = new mongoose.Schema({
        userid: { type: String },                       //用户id, 唯一
        name: { type: String },                         //姓名
        job: { type: String },                          //职位
        date: { type: Date, default: Date.now },        //入职日期
        update: { type: Date, default: Date.now },      //内容更新日期
        basicmoney: { type: Number },                   //底薪
        entryway: { type: String },                     //录用途径
        introduceri: { type: String },                  //介绍人
        master: { type: String },                       //师傅
        idnumber: { type: String },                     //身份证号
        maritalstatus: { type: Boolean },               //是否结婚
        phone: { type: String },                        //手机
        address: { type: String },                      //户籍地址
        addressnow: { type: String },                   //现住址
        education: { type: String },                    //学历
        school: { type: String },                       //毕业学校
        specialty: { type: String },                    //专业
        banknumber: { type: String },                   //银行卡号
        bankname: { type: String },                     //开户行
        gender: { type: boolean },                      //性别, true: 男
        remark: { type: String },                       //备注
        store: { type: String },                        //门店
        icon: { type: String },                         //头像
        idnumbericons: { type: String },                //身份证正反照
        enable: { type: boolean, default: true },       //删除, 通过改标识来代表
    });

    return mongoose.model('member', AppSchema);
};