from db_connection import db_connection

def setQuery(sql=None, data = None):

    db = db_connection()

    # 데이터에 접근
    cursor = db.cursor()

    cursor.execute(sql,data)
    
    # 컬럼 이름 받아오기
    columns = [col[0] for col in cursor.description]
    
    # 결과를 딕셔너리로 변환
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    # DB 연결 종료
    db.commit()
    db.close()
    return data



def PostQuery(sql = None, data = None):
    try:
        # MySQL 데이터베이스 연결
        db = db_connection()

        # 데이터에 접근
        cursor = db.cursor()

        cursor.execute(sql,data)
        
        db.commit()
        db.close()

        return 201
    except Exception as e:
        return 500


def searchQuery(cursor, sql, data=None):
    cursor.execute(sql, data)

# 나중에 포스트 형식 쓸 때 주석 풀 예정
def testQuery(sql = None, data = None):
    # MySQL 데이터베이스 연결
    db = db_connection()
    
    # 데이터에 접근
    cursor = db.cursor()

    cursor.execute(sql,data)
    
    # DB 연결 종료
    db.commit()
    db.close()
    return data
