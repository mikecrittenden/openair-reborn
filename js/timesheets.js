$(document).ready(function() {
  if ($('#timesheet_grid').length < 1) {
    return;
  }

  $('#timesheet_grid').after('<div id="p2_sidebar"></div>')
  $('#timesheet_grid').after('<div id="p2_content"></div>')

  addFillerSidebar();
  addPreviewButton();
  parseTimeGrid();
});

function addFillerSidebar() {
  var fillerSidebar = '<div>';
  fillerSidebar += '<h2>Your bookings this week.</h2>';
  fillerSidebar += '<div class="sidebar-inner">';
  fillerSidebar += '<table>';
  fillerSidebar += '<tr><td>Turner NBA Platform Build</td><td>24h</td></tr>';
  fillerSidebar += '<tr><td>NAR Realtor.org</td><td>6h</td></tr>';
  fillerSidebar += '<tr><td>GMU MRUniversity</td><td>4h</td></tr>';
  fillerSidebar += '<tr><td>SMV Beta Site</td><td>4h</td></tr>';
  fillerSidebar += '<tr><td>Group Meetings</td><td>2h</td></tr>';
  fillerSidebar += '<tr><td><strong>Total</strong></td><td><strong>40h</strong></td></tr>';
  fillerSidebar += '</table>';
  fillerSidebar += '</div></div>';

  fillerSidebar += '<div>';
  fillerSidebar += '<h2>Booked vs. Actuals</h2>';
  fillerSidebar += '<div class="sidebar-inner">';
  fillerSidebar += '<div class="chart"><img src="http://i.imgur.com/Y2nDtvu.jpg" /></div>';
  fillerSidebar += '</div></div>';

  $('#p2_sidebar').append(fillerSidebar);
}

function addPreviewButton() {
  $('#timesheet_savebutton').insertBefore('#save_grid_submit');
  $('<button id="p2_preview" class="btn-oa">Preview</button>').insertBefore('#save_grid_submit');

  $('#p2_preview').click(function(e) {
    e.preventDefault();
    $('#p2_sidebar, #p2_content, #timesheet_grid').toggle();
    if ($('#p2_preview').text() == 'Preview') {
      $('#p2_preview').html('Edit');
    } else {
      $('#p2_preview').html('Preview');
    }
  });
}

function parseTimeGrid() {
  var p2_projects = [];
  $('.timesheetControlPopupCustomerProject option').each(function() {
    if ($(this).text().length > 0) {
      p2_projects[$(this).val()] = $(this).text();
    }
  });
  console.log(p2_projects);

  var p2_time = [];
  $('.timesheetHours').each(function() {
    time = $(this).find('.timesheetInputHour').val();
    if (time.length < 1) {
      return;
    }
    date = $(this).find('a').attr('data-additional-title');
    date = date.substring(0, 2);
    project = $(this).parents('tr').find('.timesheetControlPopupCustomerProject').val();
    projectName = p2_projects[project];
    task = $(this).parents('tr').find('.timesheetControlPopup').val();
    taskName = $(this).parents('tr').find('.timesheetControlPopup option:selected').text();
    notesID = $(this).find('a').attr('data-additional-prefix');
    notes = $('input[name=' + notesID + '_dialog_notes]').val();
    p2_time.push(
      {
        time: time,
        date: date,
        project: project,
        projectName: projectName,
        task: task,
        taskName: taskName,
        notes: notes
      }
    );
  });

  console.log(p2_time)
}
