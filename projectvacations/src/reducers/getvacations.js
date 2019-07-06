function getVacations (state=[],action) {
    if (action.type="GET ALL VACATIONS") {
        return [
            ...state,
            action.allVacations
        ]
    }
    return state
}