UPDATE risk_ranking_matrix 
SET 
    regular_risk_assessment_date = #{regularRiskAssessmentDate},
    regular_risk_date_year = #{regularRiskDateYear},
    regular_risk_date_month = #{regularRiskDateMonth},
    freq_risk_assessment_date = #{freqRiskAssessmentDate},
    freq_risk_date_year = #{freqRiskDateYear},
    freq_risk_date_month = #{freqRiskDateMonth},
    freq_risk_assessment_type_id = #{freqRiskAssessmentTypeId},
    freq_risk_shee_number = #{freqRiskSheeNumber},
    process_number = #{processNumber},
    process_facility = #{processFacility},
    detail_working_equipment = #{detailWorkingEquipment},
    harmful_app_field_id = #{harmfulAppFieldId},
    harmful_status_category_id = #{harmfulStatusCategoryId},
    harmful_classification_id = #{harmfulClassificationId},
    harmful_cause_idf_id = #{harmfulCauseIdfId},
    harmful_dangerous_situation = #{harmfulDangerousSituation},
    disaster_type_id = #{disasterTypeId},
    cur_safety_measure_type_id = #{curSafetyMeasureTypeId},
    cur_safety_action_contents = #{curSafetyActionContents},
    cur_risk_possibility = #{curRiskPossibility},
    cur_risk_importance = #{curRiskImportance},
    cur_risk_level = #{curRiskLevel},
    cur_risk_grade = 
        CASE
            WHEN CHARINDEX('등급', #{curRiskGrade}) > 0
            THEN CAST(SUBSTRING(#{curRiskGrade}, 1, CHARINDEX('등급', #{curRiskGrade}) - 1) AS INT)
            ELSE NULL
        END,
    cur_high_risk_proc = #{curHighRiskProc},
    cur_risk_decs_measure = #{curRiskDecsMeasure},
    improve_measure_type_id = #{improveMeasureTypeId},
    improve_detail_contents = #{improveDetailContents},
    improve_before_picture = #{improveBeforePicture},
    improve_exec_picture = #{improveExecPicture},
    improve_exec_action_result = #{improveExecActionResult},
    improve_exec_date = #{improveExecDate},
    improve_exec_dept_id = #{improveExecDeptId},
    improve_exec_manager = #{improveExecManager},
    improve_risk_possibility = #{improveRiskPossibility},
    improve_risk_importance = #{improveRiskImportance},
    improve_risk_level = #{improveRiskLevel},
    improve_risk_grade = 
        CASE
            WHEN CHARINDEX('등급', #{improveRiskGrade}) > 0
            THEN CAST(SUBSTRING(#{improveRiskGrade}, 1, CHARINDEX('등급', #{improveRiskGrade}) - 1) AS INT)
            ELSE NULL
        END,
    remark = #{remark}
WHERE
    id = #{id} 