json.extract! user, :id, :first_name, :last_name, :birthdate, :location, :about, :education, :resume_url, :personality, :interest, :skill, :photo

if user.photo.attached?
    json.photoUrl url_for(user.photo)
end