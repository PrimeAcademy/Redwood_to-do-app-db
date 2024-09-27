console.log('Hello from client');
$(document).ready(onReady);

function onReady() {
  $('#btn-add').on('click', handleClick); // TODO change to handleAdd, cuz its a better name
  $('#all-tasks').on('click', '#btn-complete', handleComplete);
  $('#all-tasks').on('click', '#btn-delete', handleDelete);
  getTasks();
}

function handleDelete( event ) {
  let id = $( this ).closest('tr').data('id');
  console.log('id is', id);
  deleteTask( id );
}

function handleComplete( event ) {
  let id = $( this ).closest('tr').data('id');
  console.log('id is', id);
  completeTask( id );
}

function deleteTask( taskId ) {
  console.log('Deleting task id', taskId);
  $.ajax({
    method: 'DELETE',
    url: `/task/${taskId}`
  })
    .then( function( response ) {
      getTasks();
    })
    .catch( function(error) {
      alert( 'Error deleting task. Try again later.' );
      console.log( 'Error deleting task', error );
    })  
}

function completeTask( taskId ) {
  // TODO
  console.log("completeTask() was called!")
  $.ajax({
    method: 'PUT',
    url: `/task/${taskId}`
  })
  .then((response) => {
    console.log("Successfully updated task:", taskId)
    getTasks()
  })
  .catch((err) => {
    console.log("Error on /task PUT with taskId:", taskId)
  })
}

function handleClick( event ) {
  event.preventDefault();
  const task = {
    name: $('#task-name').val()
  }
  addTask( task );
}

function addTask( task ) {
  console.log('Adding task:', task);
  $.ajax({
    method: 'POST',
    url: '/task',
    data: task,
  })
    .then( function( response ) {
      console.log( 'Added successfully' );
      getTasks();
    })
    .catch( function(error) {
      alert( 'Error adding new task information. Try again later.' );
      console.log( 'Error adding task', error );
    })
}

function getTasks() {
  $.ajax({
    method: 'GET',
    url: '/task',
  })
    .then( function( response ) {
      console.log( 'Got response', response )
      displayTasks( response );
    })
    .catch( function(error) {
      alert( 'Error getting task information. Try again later.' );
      console.log( 'Error getting tasks', error );
    })
}

function displayTasks( taskArray ) {
  console.log("Incoming taskArray:", taskArray)

  $('#all-tasks').empty();
  for ( let task of taskArray ) {
    let rowHtml = $(`
      <tr>
        <td>${task.task}</td>
        <td>${ showCompleteStatus( task ) }</td>
        <td><button id="btn-delete">Delete</button></td>
      </tr>`);
    // Put id onto table row using jQuery data 
    rowHtml.data('id', task.id);
    if (task.isComplete) {
      rowHtml.addClass('completed');
    }
    $('#all-tasks').append(rowHtml)
  }
}

function showCompleteStatus( task ) {
  console.log("showCompleteStatus() was called with task:", task)
  if ( task.isComplete ) {
    return '<button id="btn-complete">Mark Incomplete</button>';
  } else {
    return `<button id="btn-complete">Mark Complete</button>`;
  }
}