class Activity < ApplicationRecord
  belongs_to :trip
  has_many :planned_activities
  has_many :accounts, through: :planned_activities

  def self.new_from_search(keyword, radius, lng, lat, trip_id)
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&radius=#{radius}&keyword=#{keyword}&type=point_of_interest&rankBy=prominence&key=AIzaSyDKctmGykKUI2sTuv_ipJ6bz9wO-WMQ4NA"
    response = RestClient.send("get", url)
    raw_data = JSON.parse(response)
    raw_data["results"].map do |r|
      activity = Activity.new
      activity.trip = Trip.find(trip_id)
      activity.name = r["name"]
      activity.lat = r["geometry"]["location"]["lat"]
      activity.lng = r["geometry"]["location"]["lng"]
      if r['photos']
        activity.img_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=#{r['photos'][0]['photo_reference']}&key=AIzaSyDKctmGykKUI2sTuv_ipJ6bz9wO-WMQ4NA"
      else
        activity.img_url = 'https://i0.wp.com/www.historyconfidential.com/wp-content/uploads/2013/04/old_holiday_inn.png'
      end
      activity.rating = r["rating"]
      activity.address = r["vicinity"]
    end
  end

end
