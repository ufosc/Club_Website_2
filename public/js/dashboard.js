/* global blogTableSelections */
function checkboxClickHandler (id) { // eslint-disable-line
  const idIndex = blogTableSelections.indexOf(id)
  if (idIndex !== -1) {
    blogTableSelections.splice(idIndex, 1)
  } else {
    blogTableSelections.push(id)
  }
}
