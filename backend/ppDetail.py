from flask_restx import Resource
from flask import jsonify,request
from db_utils import setQuery

class ppDetailPage(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        print("idx : ",idx)
        data = setQuery("select * from cos_data where idx = %s", idx)
        # data = setQuery("""select * from cos_data""")
        return jsonify(data)
    

class ppGetReveiw(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        print("idx : ",idx)
        data = setQuery("""SELECT 
                                u.user_nm,                  -- 닉네임
                                u.user_age,                 -- 연령대
                                r.good_review,              -- 리뷰 내용
                                r.bad_review,              -- 리뷰 내용
                                r.review_idx,               -- 리뷰 고유 ID
                                r.user_id,                  -- 리뷰 작성자 ID
                                r.score,					-- 리뷰 평점
                                r.cos_idx,                   -- 제품 ID
                                r.review_date,				-- 리뷰 등록 날짜
                                s.type,                -- 피부 타입
                                s.matter1, 				-- 피부 고민1
                                s.matter2, 				-- 피부 고민2
                                s.matter3 				-- 피부 고민3
                            FROM 
                                users u
                            JOIN 
                                skin_type s ON u.user_id = s.user_id
                            JOIN 
                                reviews r ON u.user_id = r.user_id
                            WHERE 
                                cos_idx = %s
                            limit 2""", idx)
        # print("dataquery: ", data)
        
        return jsonify(data)
    


class ppScoreAvg(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        print("idx : ",idx)
        data = setQuery("""select round(avg(score), 2) as score_avg
                            from reviews
                            where cos_idx = %s""", idx)
        return jsonify(data)
    

class ppScoreCnt(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        print("idx : ",idx)
        data = setQuery("""select score, count(score) as score_cnt
                            from reviews
                            where cos_idx = %s
                            group by score""", idx)
        return jsonify(data)
    

class ppReviewCnt(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        print("idx : ",idx)
        data = setQuery("""select count(good_review) as review_cnt
                            from reviews
                            where cos_idx = %s
                            group by cos_idx;""", idx)
        return jsonify(data)