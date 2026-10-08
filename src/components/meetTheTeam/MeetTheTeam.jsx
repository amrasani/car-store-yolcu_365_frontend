import React from "react";
import SectionTitle from "../section-title/SectionTitle";
import TeamMemberCard from "../TeamMemberCard/TeamMemberCard";
import { useDispatch ,useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTeamMembers } from "../../store/teamMemersSlice";
import { teamMembersReducer } from "../../store/teamMemersSlice";

const MeetTheTeam = () => {
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.teamMembersSlice);
    console.log(data);
    useEffect(() => {
        dispatch(getAllTeamMembers());
    }, [dispatch]);
  return (
    <section className=" bg-body-secondary my-5 text-body transition-all" style={{ padding: "100px 20px" }}>

    <div className="container ">
      <SectionTitle title="تعرف على فريق عملنا" />
      <h5 className="text-center">خبراؤنا هنا لمساعدتك في العثور على سيارتك المثالية</h5>
      <div clasName="container">
        <div className="row justify-content-center mt-4 gy-5 gx-4">
          {data.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default MeetTheTeam;
