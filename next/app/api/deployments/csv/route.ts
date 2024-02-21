/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const deployments = await request.json();
  const metadataRows = await fetch(
    `${process.env.API_DOMAIN}/deployments/csv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deployments),
    },
  ).then((res) => res.json());

  return NextResponse.json(metadataRows.map((metadata) => ({
    deployment_id: metadata.deployment_id,
    deployment_name: metadata.deployment_name,
    actual_date_out: metadata.actual_date_out,
    retrieval_date: metadata.retrieval_date,
    actual_lat: metadata.actual_lat,
    actual_long: metadata.actual_long,
    fuzzed: metadata.fuzzed,
    project_id: metadata.project_id,
    project_name: metadata.project_name,
    sub_project_id: metadata.sub_project_id,
    sub_project_name: metadata.sub_project_name,
    plot_name: metadata.plot_name,
    plot_treatment: metadata.plot_treatment,
    camera_failure_details: metadata.camera_failure_details,
    deployment_notes: metadata.deployment_notes,
    bait_type: metadata.bait_type,
    bait_description: metadata.bait_description,
    feature: metadata.feature,
    feature_type_methodology: metadata.feature_type_methodology,
    detection_distance: metadata.detection_distance,
    sensitivity_setting: metadata.sensitivity_setting,
    camera_id: metadata.camera_id,
  })));
}
