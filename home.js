


function getPosts(posts){

    return `<div class="status-field-container write-post-container">`+
        `<div class="user-profile-box">`+
            `<div class="user-profile">`+
                `<img src="/images/profile-pic.png" alt="">`+
                    `<div>`+
                        `<p id="users_name">${posts.appUsers.userName}</p>`+
                       ` <small>${posts.postTime}</small>`+
                   ` </div>`+
           ` </div>`+
          `  <div>`+
               ` <a href="#"><i class="fas fa-ellipsis-v"></i></a>`+
          `  </div>`+
        `</div>`+
        `<div class="status-field">`+
            `<p>${posts.content} <a href="#">#This_Post_is_Better!!!!</a></p>`+
           ` <img src="/images/feed-image-1.png" alt="">`+
       ` </div>`+
       ` <div class="post-reaction">`+
           ` <div class="activity-icons">`+
               ` <div><img src="/images/like-blue.png" alt="">120</div>`+
                `<div onclick="listComments(${posts.id})"><img src="/images/comments.png" alt="">52</div>`+
               ` <div><img src="/images/share.png" alt="">35</div>`+
            `</div>`+
           ` <div class="post-profile-picture">`+
               ` <img src="/images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>`+
           ` </div>`+
       ` </div>`+
       ` <div class="status-comment">`+
            `<div class="comment-user">`+
               ` <img src="/images/profile-pic.png" alt="" class="comment-user__avt">`+
            `</div>`+
            `<input type="text" placeholder="Viết bình luận" id="status-comment${posts.id}">`+
            ` <button onclick="addComment(${posts.id})">add</button>`+
        `</div>`+
        `<div class="status-comment-list" id="cmt+${posts.id}">`+
           // ` <div class="comment-user">`+
           //      `<img src="/images/profile-pic.png" alt="" class="comment-user__avt">`+
           //          `<div class="comment-user-ct">`+
           //             ` <span class="comment-user__name">Hiennguyen</span>`+
           //              `<span class="comment-user-content">helloooooooooooooooooooooooo</span>`+
           //         ` </div>`+
           // ` </div>`+
       ` </div>`+
   ` </div>`;
}


function listPosts(){
    let token = localStorage.getItem("token");
    let d = localStorage.getItem("data")

    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json'
        },
        beforeSend:function (xhr){
            xhr.setRequestHeader("Authorization","Bearer "+ token);
        },
        // Authorization: "Bearer "+token,
        url:"http://localhost:8080/posts",
        success:function (data){
            let ct= '<div class="story-gallery">'+
                '<div class="story story1">'+
                  '  <img src="/images/upload.png" alt="">'+
                       ' <p>Post Story</p>'+
               ' </div>'+
               ' <div class="story story2">'+
                   ' <img src="/images/member-1.png" alt="">'+
                       ' <p>Alison</p>'+
                '</div>'+
               ' <div class="story story3">'+
                   ' <img src="/images/member-2.png" alt="">'+
                      '  <p>Jackson</p>'+
              '  </div>'+
               ' <div class="story story4">'+
                   ' <img src="/images/member-3.png" alt="">'+
                     '   <p>Samona</p>'+
               ' </div>'+
              '  <div class="story story5">'+
                 '   <img src="/images/member-4.png" alt="">'+
                       ' <p>John</p>'+
             '   </div>'+
           ' </div>'+
            '<div class="write-post-container">'+
               ' <div class="user-profile">'+
                   ' <img src="/images/profile-pic.png" alt="">'+
                       ' <div>'+
                           ' <p> Alex Carry</p>'+
                         '   <small>Public <i class="fas fa-caret-down"></i></small>'+
                        '</div>'+
                '</div>'+
              '  <div class="post-upload-textarea">'+
                    '<textarea name="" placeholder="What is on your mind, Alex?"  cols="30" rows="3"></textarea>'+
                   '<div class="add-post-links">'+
                        '<a href="#"><img src="/images/live-video.png" alt="">Live Video</a>'+
                       ' <a href="#"><img src="/images/photo.png" alt="">Photo/Video</a>'+
                        '<a href="#"><img src="/images/feeling.png" alt="">Feeling Activity</a>'+
                   '</div>'+
               '</div>'+
            '</div>';
            console.log(data);

            for(let i=0; i<data.content.length; i++){
                ct += getPosts(data.content[i]);
            }

            document.getElementById('posts').innerHTML = ct;
        }
    })

}

listPosts();

function listComments(id){
    let token = localStorage.getItem("token");
    let d = localStorage.getItem("data")

    console.log(id)
    $.ajax({
        type: "GET",
        beforeSend:function (xhr){
            xhr.setRequestHeader("Authorization","Bearer "+ token);
        },
        url: "http://localhost:8080/api/comments/post/"+id,
        success:function (data){
            console.log("hello cmt")
            console.log(data)
            console.log("day là data.appuser")
            console.log(data[0].appUsers.username)
            console.log("day là data.appuser")
            let ct = ""
            for(let i=0; i<data.length; i++){
                ct +=`<div class="">`+
                    ` <div class="comment-user comment-user-contain">`+
                    `<img src="/images/profile-pic.png" alt="" class="comment-user__avt">`+
                    `<div class="comment-user-ct comment-user-ct${data[i].id}" id="comment-user-ct${data[i].id}">`+
                    ` <span class="comment-user__name">${data[i].appUsers.userName}</span>`+
                    `<span class="comment-user-content">${data[i].cmtContent}</span>`+
                    ` </div>`+
                    `<div class="comment-user-contain-show">`+
                    `<button class="comment-user-contain-show-btn" >...</button>`+
                    `<div class="comment-user-contain-delete">`+
                    `<button class="comment-user-contain-delete-btn" onclick="deleteComment(${data[i].id}, ${id})">Xóa bình luận</button>`+
                    `<button class="comment-user-contain-update-btn comment-user-contain-delete-btn" onclick="hideform(${data[i].id},${id})" >Sửa bình luận</button>`+
                    `</div>`+
                    `</div>`+
                    ` </div>`+
                    ` </div>`
            }

            document.getElementById(`cmt+${id}`).innerHTML= ct;
        }
    })

}

// $(document).ready(function (){
//
//     $('.comment-user-contain-show').click(function () {
//         $(".comment-user-contain-delete").show();
//     });
//
//
// })
//


function hideform(id, post_id){

    // $(`.comment-user-ct${id}`).hide();

    let str =  `<input type="text" placeholder="Viết bình luận" id="status-comment-update${id}${post_id}">`+
        ` <button class="status-comment-update-btn" value="Update" onclick="updateComment(${id},${post_id})"></button>`;
    document.getElementById(`comment-user-ct${id}`).innerHTML=str;


}

function updateComment(id,post_id){
    let token = localStorage.getItem("token");
    let d = localStorage.getItem("data")
    let postId = post_id;
    let content= $(`#status-comment-update${id}${post_id}`).val();
    console.log(content)
    console.log("post_id" + postId)
    console.log("id"+id)
    let appUser_id=1;
    let cmt= {
        appUsers:{
            id:appUser_id
        },
        posts:{
            id:postId
        },
        cmtContent:content
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        type:"PUT",
        data:JSON.stringify(cmt),
        beforeSend:function (xhr){
            xhr.setRequestHeader("Authorization","Bearer "+ token);
        },
        url:`http://localhost:8080/api/comments/${id}`,
        success:function (data){
            listComments(post_id)
            console.log(data)
            $(`#status-comment-update${id}${post_id}`).val("");
        }

    })
}

function addComment(post_id){
    let token = localStorage.getItem("token");
    let da = JSON.parse(localStorage.getItem("data"))
    console.log("đây là ok")
    console.log(da)
    console.log("đây là ok")
    let postId = post_id;
    let content=$(`#status-comment${post_id}`).val() ;
    console.log("chào")
    console.log(content)
    let appUser_id=da.id;
    console.log("đây là appUser_id"+appUser_id)
    let cmt= {
        appUsers:{
            id:appUser_id
        },
        posts:{
            id:postId
        },
        cmtContent:content
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        type:"POST",
        data:JSON.stringify(cmt),
        beforeSend:function (xhr){
            xhr.setRequestHeader("Authorization","Bearer "+ token);
        },
        url:"http://localhost:8080/api/comments",
        success:function (data){
            listComments(post_id)
            $(`#status-comment${post_id}`).val("")
        }

    })
}



function deleteComment(id,post_id){
    let token = localStorage.getItem("token");
    let d = localStorage.getItem("data")
    console.log(id)
    console.log("post_id: "+ post_id)
    $.ajax({
        type:"DELETE",
        beforeSend:function (xhr){
            xhr.setRequestHeader("Authorization","Bearer "+ token);
        },
        url:`http://localhost:8080/api/comments/${id}`,
        success:function (){
            listComments(post_id)
        }
    })

}

