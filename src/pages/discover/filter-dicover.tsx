import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import MultiSelect from "../../components/multi-select/multi-select";
import Range from "../../components/range/range.component";
import {
  languageOptions,
  trainingDaysOptions,
} from "../../constants/constants";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { gymService } from "../../services/gym/gym.service";
import { GymResponse } from "../../services/types";

const genders = [
  {
    id: "MALE",
    name: "Male",
  },
  {
    id: "FEMALE",
    name: "Female",
  },
  {
    id: "OTHERS",
    name: "Others",
  },
];

const experiences = [
  {
    id: "BEGINNER",
    name: "Beginner",
  },
  {
    id: "INTERMEDIATE",
    name: "Intermediate",
  },
  {
    id: "ADVANCED",
    name: "Advanced",
  },
];

interface FilterDiscoveryForm {
  distance: number;
  age: number[];
  gyms: string[];
  genders: string[];
  languages: string[];
  workoutDays: string[];
  experiences: string[];
}

interface FilterDiscoverProps {
  onSubmit: (values: any, actions: any) => void;
}

const FilterDiscover = (props: FilterDiscoverProps) => {
  const { onSubmit } = props;

  const [gyms, setGyms] = useState<{ id: string; name: string }[]>([]);

  const initialValues: FilterDiscoveryForm = {
    distance: 0,
    age: [18, 50],
    gyms: [],
    genders: [],
    languages: [],
    workoutDays: [],
    experiences: [],
  };

  useRestCallEffect(async () => {
    const gyms: GymResponse[] = await gymService.getGyms();

    setGyms(
      gyms.map((i) => {
        return {
          id: i.id,
          name: i.name,
        };
      })
    );
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, submitForm }) => (
        <div className="filter-list-area">
          <div className="filter-area range-area">
            <div className="filter-label-area">
              <span className="filter-label">Distance</span>
            </div>

            <div className="filter-input-area filter-input-range padding-range">
              <Range
                values={[values.distance]}
                step={10}
                min={0}
                max={100}
                prefix={"km"}
                onChange={(values) => {
                  setFieldValue("distance", values[0]);
                }}
              />
            </div>
          </div>

          <div className="filter-area range-area">
            <div className="filter-label-area">
              <span className="filter-label">Age</span>
            </div>

            <div className="filter-input-area filter-input-range padding-range">
              <Range
                values={values.age}
                step={1}
                min={18}
                max={50}
                two={true}
                onChange={(values) => {
                  setFieldValue("age", values);
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div className="filter-label-area">
              <span className="filter-label">GYM</span>
            </div>

            <div className="filter-input-area">
              <MultiSelect
                options={gyms}
                onChange={(values) => {
                  setFieldValue(
                    "gyms",
                    values.map((i) => i.id)
                  );
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div className="filter-label-area">
              <span className="filter-label">Gender</span>
            </div>

            <div className="filter-input-area">
              <MultiSelect
                options={genders}
                onChange={(values) => {
                  setFieldValue(
                    "genders",
                    values.map((i) => i.id)
                  );
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div className="filter-label-area">
              <span className="filter-label">Language</span>
            </div>

            <div className="filter-input-area">
              <MultiSelect
                options={languageOptions}
                onChange={(values) => {
                  setFieldValue(
                    "languages",
                    values.map((i) => i.id)
                  );
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div className="filter-label-area">
              <span className="filter-label">Workout days</span>
            </div>

            <div className="filter-input-area">
              <MultiSelect
                options={trainingDaysOptions}
                onChange={(values) => {
                  setFieldValue(
                    "workoutDays",
                    values.map((i) => i.id)
                  );
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div className="filter-label-area">
              <span className="filter-label">Experience</span>
            </div>

            <div className="filter-input-area">
              <MultiSelect
                options={experiences}
                onChange={(values) => {
                  setFieldValue(
                    "experiences",
                    values.map((i) => i.id)
                  );
                }}
              />
            </div>
          </div>

          <div className="filter-area">
            <div
              className="filter-btn"
              onClick={() => {
                submitForm();
              }}
            >
              <span>Filter now</span>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FilterDiscover;
