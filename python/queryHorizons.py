from astroquery.jplhorizons import Horizons
from datetime import datetime, timedelta
import json

class SolarSystem:
    def __init__(self):
        self.data = {}
        self.body_ids=[]
        self.epochs = {}

    def set_body_ids(self, body_ids=[]):
        self.body_ids.clear()
        self.body_ids = body_ids

    def set_epoche(self, start_date, stop_date, date_granularity):
        self.epochs = {
            "start":str(start_date),
            "stop": str(stop_date),
            "step": date_granularity}

    def query_system(self):
        print(self.epochs)
        for i in self.body_ids:
            vector = self.__query_body(i)
            self.__dissect_vector(vector)
        return self.data
    
    def export_data(self, path):
        json_file = json.dumps(self.data)
        f = open(path, 'w')
        f.write(json_file)
        f.close


    def __query_body(self, body_id):
        try:
            obj = Horizons(id=body_id, epochs=self.epochs,  location='500@sun', id_type='majorbody')
            vec = obj.vectors()
            return vec
        except ValueError as e:
            print(e)

    def __get_timestamps(self,vector):
        ts = []
        for entry in vector:
            ts.append(entry[1])
            print(entry[1])
        return ts
        
    def __get_positions(self, vector):
        position_list = []
        for entry in vector:
            position_dict = {
                "x":entry[3],
                "y":entry[4],
                "z":entry[5]
            }
            position_list.append(position_dict)
        return position_list        

    def __dissect_vector(self, vector):
        self.data["timestamps"] = self.__get_timestamps(vector)
        
        body = {
            "id":"",
            "name":"",
            "positions":[]
        }

        body_name_and_id = str(vector[0][0])
        id = body_name_and_id[body_name_and_id.find("(")+1:body_name_and_id.find(")")]
        name = body_name_and_id[0:body_name_and_id.find("(")-1]
        body["name"] = name
        body["id"] = id
        body["positions"] = self.__get_positions(vector)
        if("bodies" not in self.data):
            self.data["bodies"]= [body]
        else:
            self.data["bodies"].append(body)

        

#  Mock data shape
#  interface BodyTimeline {
#    id:  number;
#    alias: string;
#    positions: [] BodyPosition;
#  }
#  interface BodyPosition {
#    x: number;
#    y: number:
#    z: number;
#  }
#  interface TimeSlice {
#    // data in days
#    timestamps: []number;
#    bodies: [] BodyTimeline;
#    errors:[] string;
#  }

ss = SolarSystem()
ss.set_epoche(datetime.today().date(),datetime.today().date()+timedelta(days=5), "1d")
ss.set_body_ids([199,299,399,499,599,699,799,899,999])
ss.query_system()
ss.export_data("data.json")

