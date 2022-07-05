const compare = ( a, b ) => {
    if (a.likes < b.likes) {
        return 0
    }
    if (a.likes > b.likes) {
        return -1
    }
}

export default compare