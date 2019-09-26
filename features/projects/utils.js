import ColorHash from 'color-hash';

export function colorFromProject(project) {
	return new ColorHash({lightness: 0.5, saturation: 0.6}).hex(`${project.user}/${project.id}:${project.name}`)
}

export function joinProjectsWithTasks(projects, tasks, orderFunc = null) {
	// loop over each project and match with each task.
	return projects.map(project => {
		project.tasks = tasks.filter(task => {
			return task.project_set.find(p => p.id === project.id) !== undefined
		})

		return project;
	})
}