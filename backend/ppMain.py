from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

# 메인화면 중 배너 데이터 전송 서버
class ppMainPage(Resource):

    def get(self):
        data = setQuery("""select idx, brand_name, cos_name, cos_img_src, 
                            grade, grade_count, price, vol
                            from cos_data""")
        return jsonify(data)
    

# 메인 화면 중 카테고리 선택 후 데이터 전송 서버
class ppCategorySel(Resource):

    def get(self):
        data = request.args.to_dict()
        cateValue = data['category']
        print("cateValue : ",cateValue)
        data = setQuery(f'select * from cos_data where cos_name like "%{cateValue}%" limit 9')
        # data = setQuery("""select * from cos_data""")
        return jsonify(data)