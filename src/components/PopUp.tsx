import { Controller, useForm } from "react-hook-form";
import { Select, MenuItem, Autocomplete, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { threadType } from "../pages/ThreadList";
import "../styles/PopUp.css";
import useApiAxios from "../hooks/useApiAxios";
interface Props {
  handleCancel: () => void;
  reference?: {
    id: string;
    topic: string;
  };
}

export interface threadRef {
  id: string;
  topic: string;
}

export default function PopUp({ handleCancel, reference }: Props) {
  const { register, handleSubmit, control } = useForm();
  const [threads, setThreads] = useState<threadRef[]>([]);
  const { course_id } = useParams();
  const { urgency_tag } = useParams();
  const apiAxios = useApiAxios();
  const navigate = useNavigate();

  useEffect(() => {
    apiAxios.get(`/courses/${course_id}/threads`).then((res) => {
      setThreads(
        res.data.map((thread: threadType) => {
          return {
            id: thread.id,
            topic: thread.topic,
          };
        })
      );
    });
  }, [course_id]);

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  const onSubmit = async (data: any) => {
    try {
      await apiAxios.post(`/courses/${course_id}/threads`, {
        ...data,
        parentThread: data.parentThread?.id,
      });
    } catch (err) {
      console.error(err);
    } finally {
      handleCancel();
      navigate(0);
    }
  };

  return (
    <div className="pop-up">
      <button className="cancel-button" onClick={handleCancel}>
        <CloseIcon />
      </button>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h4>Topic*</h4>
          <input
            type="text"
            className="input-topic"
            {...register("topic", { required: true })}
          ></input>
        </div>
        <div className="reference-input">
          <h4>Reference</h4>
          <Controller
            name="parentThread"
            control={control}
            defaultValue={reference}
            render={({ field }) => (
              <Autocomplete
                {...field}
                getOptionLabel={(option) => option.topic}
                size="small"
                value={field.value || null}
                sx={{ width: "50%" }}
                options={threads}
                onChange={(event, newValue, reason) =>
                  field.onChange(reason === "clear" ? null : newValue)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
        </div>
        <h4>Description*</h4>
        <textarea
          className="input-description"
          {...register("content", { required: true })}
        ></textarea>
        <Controller
          name="urgencyTagString"
          control={control}
          defaultValue={urgency_tag}
          render={({ field }) => (
            <Select {...field} inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={"regular"}>Regular</MenuItem>
              <MenuItem value={"urgent"}>Urgent</MenuItem>
              <MenuItem value={"lowPriority"}>Low Priority</MenuItem>
            </Select>
          )}
        />
        <button type="submit" className="submit-button">
          Post
        </button>
      </form>
    </div>
  );
}
