json.extract! project, :id, :project_title, :project_description, :role, :leader_id

if project.picture.attached?
    json.pictureUrl url_for(project.picture)
end