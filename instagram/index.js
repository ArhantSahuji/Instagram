const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 }=require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({extend:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id : uuidv4(),
        name: "Arhant",
        profilepic:"https://i.pinimg.com/736x/18/8d/45/188d45655214aaf4d79d771d4ee55d38.jpg",
        image : "https://images.pexels.com/photos/18873395/pexels-photo-18873395/free-photo-of-tea-coffee-and-a-vase-with-blooming-flowers-on-a-table-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 123,
        followers:864,
        following:846,
        discription:"hi arhant this side",
        comment:"Not commented yet",
        imglinks : [],
    },
    {
        id: uuidv4(),
        name: "Siddharth",
        profilepic:"https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_960_720.png",
        image : "https://images.pexels.com/photos/18873395/pexels-photo-18873395/free-photo-of-tea-coffee-and-a-vase-with-blooming-flowers-on-a-table-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 123,
        followers:784,
        following:946,
        discription:"hi arhant this side",
        comment:"Not commented yet",
        imglinks : [],
    },
    {
        id: uuidv4(),
        name: "Ritesh",
        profilepic:"https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj",
        image : "https://images.pexels.com/photos/18873395/pexels-photo-18873395/free-photo-of-tea-coffee-and-a-vase-with-blooming-flowers-on-a-table-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 123,
        followers:487,
        following:954,
        discription:"hi arhant this side",
        comment:"Not commented yet",
        imglinks : [],
    },
    {
        id: uuidv4(),
        name: "Abhishek",
        profilepic:"https://i.pinimg.com/736x/3d/96/eb/3d96eba59a324ac1570e174fd5bb5e94.jpg",
        image : "https://images.pexels.com/photos/18873395/pexels-photo-18873395/free-photo-of-tea-coffee-and-a-vase-with-blooming-flowers-on-a-table-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 123,
        followers:845,
        following:890,
        discription:"hi arhant this side",
        comment:"Not commented yet",
        imglinks : [],
    }
];

let reelsarr=["https://youtube.com/shorts/TDCLQE9-_qg?si=SebgZRsribJzr9Gf",
    "https://youtube.com/shorts/QaU6gEtOwyE?si=PcKu9cj0uRJmOWMq",
    "https://youtube.com/shorts/QaU6gEtOwyE?si=PcKu9cj0uRJmOWMq"
];

app.get("/home",(req,res)=>{
    res.render("index.ejs",{posts});
    // console.log("index.ejs");
});

app.get("/home/:id/comments",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("comment.ejs",{post});
});

app.patch("/home/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newcomment=req.body.comment;
    let post=posts.find((p)=> id===p.id);
    post.comment=newcomment;
    res.redirect("/home");
});

app.get("/home/:id/profile",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("profile.ejs",{post});
});

app.get("/home/reels",(req,res)=>{
    let reels=reelsarr;
    res.render("reels.ejs",{reels});
});

app.get("/home/:id/newpost",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("newpost.ejs",{post});
})

app.post("/home/:id/profile",(req,res)=>{
    let {id}=req.params;
    let{imglink}=req.body;
    let post=posts.find((p)=>id===p.id);
    post.imglinks.push(imglink);
    console.log(post);
    console.log(post.imglinks);
    let str=`/home/${id}/profile`;
    console.log(str);
    res.redirect(str);
    // res.redirect("/home/:id/profile");
})

app.listen(port,()=>{
    console.log("listening to port : 8080");
});