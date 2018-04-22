window.onload = function() {

    document.getElementById('groupForm').onsubmit = function() {

        const groupsWindow = new GroupsWindow();

        if (!groupsWindow.validate()) {
            return false;
        }

        groupsWindow.generate();

        return false;
    }
}