$(document).ready(function(){
    var i = 0;
    for(i = 0; i < localStorage.length;i++){
        var taskID = "task-" + i;
        $('#tasklist').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>")
    }

    $('#taskEntryForm').submit(function(){
        if($('#taskInput').val() !== ""){
            var taskID = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskID,taskMessage);
            $('#tasklist').append("<li class='task' id='" + taskID + "'>" + taskMessage + "</li>");
             
             var task = $('#' + taskID);
             task.css('display', 'none');
             task.slideDown();
             $('#taskInput').val("");
             i++;
        }
        return false;
    });

    $('#tasklist').on("click", "li", function (event){
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function(){
            self.remove();
        });

    });
});