# cv_model.py

def analyze_image(image_file):
    """
    Temporary safe function (no ML model)
    Prevents backend crash
    """
    try:
        return "possible skin infection or irritation"
    except Exception as e:
        print("CV ERROR:", e)
        return "Could not analyze image"