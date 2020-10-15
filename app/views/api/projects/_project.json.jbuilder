json.extract! project, :id, :project_title, :project_description, :leader_id, :role, :tag_id

if project.picture.attached?
    json.pictureUrl url_for(project.picture)
end