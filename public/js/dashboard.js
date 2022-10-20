/* global blogTableSelections */

// adds individual row to selections array
function checkboxClickHandler (id) { // eslint-disable-line
  const idIndex = blogTableSelections.indexOf(id)
  if (idIndex !== -1) {
    blogTableSelections.splice(idIndex, 1)
  } else {
    blogTableSelections.push(id)
  }
}

// adds all table rows to selections array / removes all
function selectAllCheckboxClickHandler (tableBodyId) { // eslint-disable-line
  const tbodyElement = document.getElementById(tableBodyId)
  const rowsArray = tbodyElement.querySelectorAll('.data-row')

  // if all are selected: remove all
  if (blogTableSelections.length === rowsArray.length) {
    blogTableSelections.splice(0, blogTableSelections.length)
    // set checkboxes to unchecked
    for (let i = 0; i < rowsArray.length; i++) {
      rowsArray[i].getElementsByTagName('input')[0].checked = false
    }
    return
  }

  // add all rows that aren't selected
  for (let i = 0; i < rowsArray.length; i++) {
    const rowId = rowsArray[i].id

    // don't add row if it's already selected
    if (blogTableSelections.indexOf(rowId) !== -1) continue

    blogTableSelections.push(rowId)

    // set checkbox to checked
    rowsArray[i].getElementsByTagName('input')[0].checked = true
  }
}
